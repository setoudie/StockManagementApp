from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autoriser toutes les origines

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello World!"})


@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Lire le fichier CSV
    content = file.read().decode('utf-8')
    print(content)
    return jsonify({'message': 'Upload successful', 'file_size': len(content)}), 200

if __name__ == '__main__':
    app.run(debug=True)
