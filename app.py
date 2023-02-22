import flask
import json 

# A simple Flask App which takes
# a user's name as input and responds
# with "Hello {name}!"

app = flask.Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    message = ''
    if flask.request.method == 'POST':
        message = 'Hello ' + flask.request.form['name-input'] + '!'
        import json
        with open('data.json', 'w') as f:
            json.dump({}, f)
    return flask.render_template('index.html', message=message)

if __name__ == '__main__':
    app.run()