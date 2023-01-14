import flask_login
from flask import render_template, Blueprint, url_for, redirect, jsonify
from flask import request
import json
from flask import Response
from flask_login import login_required

from team_bc.models.Infomation import Information
from team_bc.models.question import Question

bp = Blueprint('question', __name__, url_prefix='/board')


@bp.route('/list')
@login_required
def _list():
    from flask import session
    question_list = Question.query.all()
    result = []
    for i in question_list:
        part = i.to_dict()
        part.pop("content")
        if part["flag"]:
            result.append(i.to_dict())
    return result


@bp.route('/create', methods=(['POST']))
@login_required
def create():
    dic_data = json.loads(request.data)
    subject = dic_data["subject"]
    content = dic_data["content"]
    from flask import session
    user_id = session['_user_id']
    creator = Information.query.get(user_id).name
    from datetime import datetime
    q = Question(subject=subject, creator=creator, content=content, create_date=datetime.now(), user_id=user_id)
    from team_bc import db
    db.session.add(q)
    db.session.commit()
    return jsonify()


@bp.route('/update', methods=['POST'])
@login_required
def modify():
    dic_data = json.loads(request.data)
    subject = dic_data["subject"]
    content = dic_data["content"]
    question_id = dic_data["aid"]
    question = Question.query.get(question_id)
    if str(flask_login.current_user.id) == str(question.user_id):
        question.subject = subject
        question.content = content
        from team_bc import db
        db.session.commit()
        response = jsonify()
    else:
        response = jsonify()
        response.status_code = 401

    return response


@bp.route('/delete', methods=('POST',))
@login_required
def delete():
    dic_data = json.loads(request.data)
    question_id = dic_data["aid"]
    question = Question.query.get(question_id)
    if str(flask_login.current_user.id) == str(question.user_id):
        from team_bc import db
        db.session.delete(question)
        db.session.commit()
        res = Response("", status=200, mimetype='application/json')
    else:
        res = Response("", status=401, mimetype='application/json')

    return res

@bp.route('/article', methods=['POST'])
@login_required
def get_article():
    aid = request.get_json()['aid']
    article = Question.query.get(aid)
    return article.to_dict()
