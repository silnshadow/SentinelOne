import json
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import os
from flask import Flask
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure MySQL database connection
# Configure MySQL database connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Ghost%40xl8@localhost:3306/ttevaluation'
db = SQLAlchemy(app)

app.config['UPLOAD_FOLDER'] = r'C:\Users\pc\Desktop\TalentTourney'

# Define the model for the users table
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), unique=True)
    email = db.Column(db.String(255))
    password = db.Column(db.String(255))
    works = db.relationship('ArtistWork', backref='user', lazy=True)

# Define the model for the artist_work table
class ArtistWork(db.Model):
    __tablename__ = 'artist_work'
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255))
    file_path = db.Column(db.String(255))
    points = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


# Route to load user works and ratings
@app.route('/user/<username>', methods=['GET'])
def load_user_works_and_ratings(username):
    user = User.query.filter_by(username=username).first()
    if user:
        works = user.works
        work_data = [{'filename': work.filename, 'file_path': work.file_path, 'points': work.points} for work in works]
        return jsonify({'username': username, 'works': work_data}), 200
    else:
        return jsonify({'message': 'User not found'}), 404


# Route to upload user work
@app.route('/upload', methods=['POST'])
def upload_user_work():
    print("Hitting upload function")
    try:
        print("Request form data:", request.form)
        print("Request files:", request.files)

        username = request.form.get('username')
        filename = request.form.get('filename')
        file_path = request.files.get('file_path')
        points = request.form.get('points')

        if not all([username, filename, file_path, points]):
            return jsonify({'message': 'Missing required fields'}), 400

        user = User.query.filter_by(username=username).first()
        if not user:
            return jsonify({'message': 'User not found'}), 404

        # Save the uploaded file
        if file_path:
            filename = secure_filename(file_path.filename)
            file_path.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        new_work = ArtistWork(filename=filename, file_path=file_path, points=points, user_id=user.id)
        print(new_work)
        db.session.add(new_work)
        db.session.commit()
        
        return jsonify({'message': 'Work uploaded successfully'}), 201
    except Exception as e:
        print("Error:", e)
        return jsonify({'message': 'An error occurred'}), 500

if __name__ == '__main__':
    # Create database tables if they don't exist
    db.create_all()
    # Run the Flask app
    app.run(debug=True)