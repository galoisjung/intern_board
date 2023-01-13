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
        print(session)
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
    q = Question(subject=subject, creator=creator, content=content, create_date=datetime.now())
    from team_bc import db
    db.session.add(q)
    db.session.commit()
    return jsonify()


@bp.route('/update', methods=['POST'])
@login_required
def modify():
    dic_data = json.loads(request.data)
    print(dic_data)
    subject = dic_data["subject"]
    content = dic_data["content"]
    question_id = dic_data["aid"]
    question = Question.query.get(question_id)
    question.subject = subject
    question.content = content

    from team_bc import db
    a = db.session.commit()
    print(a)
    return jsonify()


@bp.route('/delete', methods=('POST',))
@login_required
def delete():
    dic_data = json.loads(request.data)
    question_id = dic_data["aid"]
    question = Question.query.get(question_id)
    from team_bc import db
    db.session.delete(question)
    db.session.commit()
    return Response("{'status':'200'}", status=200, mimetype='application/json')


@bp.route('/article', methods=['POST'])
@login_required
def get_article():
    aid = request.get_json()['aid']
    article = Question.query.get(aid)
    return article.to_dict()
