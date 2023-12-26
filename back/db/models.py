from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, MetaData
from sqlalchemy.orm import relationship
from .database import Base

metadata = MetaData()

class DbUser(Base):
    __metadata__ = metadata
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True, unique=True)
    username = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)
    items = relationship('DbPost', back_populates='user')

class DbPost(Base):
    __metadata__ = metadata
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True, index=True, unique=True)
    image_url = Column(String)
    image_url_type = Column(String)
    caption = Column(String)
    timestamp = Column(DateTime)
    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship('DbUser', back_populates='items')
    comments = relationship('DbComment', back_populates='post')

class DbComment(Base):
    __metadata__ = metadata
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, index=True, unique=True)
    text = Column(String)
    username = Column(String)
    timestamp = Column(String)
    post_id = Column(Integer, ForeignKey('posts.id'))
    post = relationship("DbPost", back_populates="comments")
