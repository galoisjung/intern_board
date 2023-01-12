

def edit_article(jsonBodyData):
    try:
        import json
        jsonData = json.loads(jsonBodyData)
        from team_bc import db
        target =db.query(Article).filter(self.Article.a_aid == jsonData['id']).first()
        target.a_title = jsonData['subject']
        target.a_article = jsonData['content']
        self.session.commit()
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


def delete_article(articleID):
    returnDict = {'success': True}
    try:
        target = self.session.query(self.Article).filter(self.Article.a_aid == articleID).first()
        self.session.delete(target)

        ######################### 댓글 삭제

        targets = self.session.query(self.Reply).filter(self.Reply.r_aid == articleid)
        for target in targets:
            self.session.delete(target)
        self.session.commit()
        ######################### 댓글 삭제

        return self.jse.encode(returnDict)
    except:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


def edit_reply(jsonBodyData):
    '''
    {'id':글 고유번호, 'creator':작성자, 'content':본문내용} 을 입력 받는 것으로 상정
    '''
    returnDict = {'success': True}
    try:
        jsonData = json.loads(jsonBodyData)
        target = self.session.query(self.Reply).filter(self.Article.r_rid == jsonData['id']).first()
        target.r_article = jsonData['content']
        self.session.commit()
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


def delete_reply(rID):
    returnDict = {'success': True}
    try:
        target = self.session.query(self.Reply).filter(self.Reply.r_rid == rID).first()
        self.session.delete(target)
        self.session.commit()
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


# 제서님 작성 코드 병합 20230111 1501
##################################################################################################


# 장경욱 20230112 1506 코드 수정
def get_page(self):
    returnDict = {'success': True}

    '''
    # pagenum = 1 # 페이지번호 인풋으로 들어옴
    per_page = 10 # 페이지당 글 수

    article_start = (pagenum - 1) * per_page
    article_end = pagenum * per_page
    '''

    try:

        # q = self.session.query(self.Article).all()[article_start:article_end] # .order_by(-self.Article.a_aid) # order by 왜 안 됨?
        q = self.session.query(self.Article).all()
        # article_list = [{"id": q[i].a_aid, "subject": q[i].a_title, "creator": q[i].a_uploader, "create_date": str(q[i].a_timestamp)} for i in range(per_page)]
        article_list = [{"id": q[i].a_aid, "subject": q[i].a_title, "creator": q[i].a_uploader,
                         "create_date": str(q[i].a_timestamp)} for i in range(len(q))]

        returnDict["data"] = article_list
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict["error"] = str(e)
        return self.jse.encode(returnDict)


# aid json body로 올 것 상정하고 수정할 것
def post_reply(self, articleid, jsonBodyData):
    returnDict = {'success': True}
    try:
        jsonData = json.loads(jsonBodyData)
        self.session.add(self.Reply(r_aid=articleid,
                                    r_rid=jsonData['id'],
                                    r_reply=jsonData['content'],
                                    r_uploader=jsonData['creator'],
                                    r_timestamp=self.time_stamp()))
        self.session.commit()
        return self.jse.encode(returnDict)

    except:
        returnDict['success'] = False
        returnDict["error"] = str(e)
        return self.jse.encode(returnDict)


def get_reply(self, articleid=1):
    '''
    articleid: 조회하고자 하는 게시물의 r_aid(a_aid)
    '''
    returnDict = {'success': True}

    try:
        q = self.session.query(self.Reply).filter(self.Reply.r_aid == articleid)
        reply_list = [{"id": q[i].r_rid, "content": q[i].r_reply, "creator": q[i].r_uploader,
                       "create_date": str(q[i].r_timestamp)} for i in range(q.count())]

        returnDict["data"] = reply_list
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict["error"] = str(e)
        return self.jse.encode(returnDict)


# 임시용 함수 개량
##################################################################################################
def get_article(self, jsonBodyData):
    returnDict = {'success': True}
    try:
        jsonData = json.loads(jsonBodyData)
        target = self.session.query(self.Article).filter(self.Article.a_aid == jsonData['id']).first()
        dataDict = {}
        dataDict['id'] = target.a_aid
        dataDict['subject'] = target.a_title
        dataDict['creator'] = target.a_uploader
        dataDict['create_date'] = str(target.a_timestamp)
        dataDict['content'] = target.a_article

        returnDict['data'] = dataDict

        self.session.commit()
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


def post_article(self, jsonBodyData):
    returnDict = {'success': True}
    try:
        jsonData = json.loads(jsonBodyData)
        self.session.add(self.Article(a_title=jsonData['subject'],
                                      a_uploader=jsonData['creator'],
                                      a_timestamp=self.time_stamp(),
                                      a_article=jsonData['content']))
        self.session.commit()
        return self.jse.encode(returnDict)

    except Exception as e:
        returnDict['success'] = False
        returnDict['error'] = str(e)
        return self.jse.encode(returnDict)


# 임시용 함수
##################################################################################################
def temp_find(self, n):
    q = self.session.query(self.Article).filter(self.Article.a_aid == n)
    for l in q:
        print(l.a_aid, l.a_title, l.a_uploader, l.a_timestamp, l.a_article)
    self.session.commit()


def temp_add(self, jsonBodyData):
    jsonData = json.loads(jsonBodyData)
    self.session.add(self.Article(a_title=jsonData['subject'],
                                  a_uploader=jsonData['creator'],
                                  a_timestamp=self.time_stamp(),
                                  a_article=jsonData['content']))
    self.session.commit()


def temp_view(self):
    q = self.session.query(self.Article)
    for l in q:
        print(l.a_aid, l.a_title, l.a_uploader, l.a_timestamp, l.a_article)
    self.session.commit()


def temp_json(self):
    returnDict = {'success': True}
    returnDict['data'] = []
    q = self.session.query(self.Article)
    for l in q:
        returnDict['data'].append(
            {'id': l.a_aid,
             'subject': l.a_title,
             'creator': l.a_uploader,
             'content': l.a_article,
             'create_date': str(l.a_timestamp)})
    self.session.commit()
    return self.jse.encode(returnDict)
##################################################################################################
