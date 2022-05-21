
from dataclasses import fields
from operator import methodcaller
from flask import Flask, jsonify, request
from flask_cors import cross_origin, CORS

from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import datetime


app = Flask(__name__) #creating object of flask

#add config
app.config['SQLALCHEMY_DATABASE_URI']= 'mysql://karira:password@localhost/flaskarticle'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False


db = SQLAlchemy(app) #create object of datbase connection

ma = Marshmallow(app) #object of marshmallow schema

cors = CORS(app)

class Articles(db.Model):
    id= db.Column(db.Integer, primary_key=True)
    title= db.Column(db.String(100))
    body= db.Column(db.Text())
    date= db.Column(db.DateTime, default =datetime.datetime.now )


    def __init__(self,title,body):
        self.title = title
        self.body = body

#we need to serialize data before sending to frontend
class ArticleSchema(ma.Schema):
    #specify fields we want to send
    class Meta:
        fields = ('id','title', 'body','date')
        load_instance = True
#create schema object

article_schema = ArticleSchema()

articles_schema = ArticleSchema(many=True)



@app.route('/get', methods = ['GET'])
@cross_origin()
def get_articles():
    #return jsonify({"Hello": "World"})
    all_articles = Articles.query.all()
   

    results = articles_schema.dump(all_articles)

    return jsonify(results)


@app.route('/add', methods = ['POST'])
@cross_origin()
def add_article():
    title = request.json['title']
    body = request.json['body']
    
    newarticle = Articles(title,body)
    db.session.add(newarticle)
    db.session.commit()

    return article_schema.jsonify(newarticle)
    

    

@app.route('/get/<id>/',methods = ['GET'])
def post_details(id):
    specificarticle = Articles.query.get(id)

    return article_schema.jsonify(specificarticle)

#update route
@app.route('/update/<id>/',methods = ['PUT'])
@cross_origin()
def update_details(id):
    article = Articles.query.get(id)

    title = request.json['title']
    body = request.json['body']

    article.title= title
    article.body = body

    db.session.commit()

    return article_schema.jsonify(article)

#delete route
@app.route('/delete/<id>/', methods = ['DELETE'])
@cross_origin()
def delete_details(id):
    deletearticle = Articles.query.get(id)
    
    #deletearticle = Articles.filter(id)

    db.session.delete(deletearticle)
    db.session.commit()
    articles = Articles.query.all()

    return articles_schema.jsonify(articles)


if __name__ == "__main__":
    app.run(host ="0.0.0.0", port=3000, debug=True)
    # app.run(host ="192.168.0.101", port=3000,debug=True)