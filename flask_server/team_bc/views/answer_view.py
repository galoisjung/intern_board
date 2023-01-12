from flask import Blueprint, jsonify
from flask import request
import json

from team_bc.models import question
from team_bc.models.Infomation import Information
from team_bc.models.answer import Answer
from team_bc.models.question import Question

bp = Blueprint('answer', __name__, url_prefix='/comment')


## 댓글 게재
@bp.route("/<int:rid>/create", methods=["POST"])
def add_comment(rid):
    """Add a comment and return the comment with ID"""
    dic_data = json.loads(request.data)
    question = Question.query.get_or_404(rid)
    content = dic_data['reply']
    from flask import session
    user_id = session['_user_id']
    from datetime import datetime
    answer = Answer(content=content, create_date=datetime.now(), creator=user_id)
    question.answer_set.append(answer)
    from team_bc import db
    db.session.commit()

    return jsonify()


@bp.route("/<int:rid>")
def show_comment(rid):
    question = Question.query.get_or_404(rid)
    print(question.answer_set)
    result = []
    for ans in question.answer_set:
        result.append(ans.to_dict())
    return result


## 댓글 수정
@bp.route("/<int:rid>/modify", methods=["PUT"])
def update_comment(rid):
    return jsonify()

## 댓글 삭제
