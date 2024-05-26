from pytube import YouTube
from flask import Flask, request,jsonify, make_response
import os

def downloadFile(link):
    yt = YouTube(link)
    yt.streams.filter(only_audio=True).first().download("downloads")   

app = Flask(__name__)

@app.route("/button_clicked" , methods=["POST"])
def handle_button_click():
    if request.method == "POST":
        if(os.path.exists("./downloads") == False):
            os.mkdir("downloads")
        link = request.data.decode("utf-8")
        response = str(link)
        downloadFile(link)  
        response = make_response(response)
        response.headers["Access-Control-Allow-Origin"] = "chrome-extension://amndpgbnmnhhkohgmakkecabpdoaikep"
        return response
    

if __name__ == "__main__":
  app.run(debug=True)
