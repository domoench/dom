from flask import Flask, render_template
application = Flask(__name__)

@application.route('/')
def index():
    return render_template('index.html')

@application.route('/projects')
def projects():
    return render_template('projects.html')

@application.route('/fmri-viz')
def fmri():
    return render_template('fmri-viz.html')

@application.route('/music')
def music():
    return render_template('music.html')

if __name__ == "__main__":
    application.run(host='0.0.0.0')
