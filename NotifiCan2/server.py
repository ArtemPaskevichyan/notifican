from flask import Flask, render_template, request, redirect
from forms.objects import Measure, Can
from forms import db_session
from flask import jsonify
from random import randint


app = Flask(__name__)
app.config['SECRET_KEY'] = 'yandexlyceum_secret_key'
mapbox_access_token = "pk.eyJ1IjoiYXJ0eW9tcGFza2V2aWNoeWFuIiwiYSI6ImNremJvNnRvMDAxZWEybnFncmt1YmpydnkifQ.HU4Qhi34Mu8ohOShn5snHw"


@app.route("/")
@app.route("/index")
def indexPage():
    return render_template('base.html')


@app.route("/add", methods=['POST', 'GET'])
def addData():
    print('STAGE 1', request.args)
    if request.args['token'] != "TOKEN":
        return "wrong token in request", 402
    data = {
        "id": request.args["id"] if request.args["id"] else "None",
        "value": request.args["value"] if request.args["value"] else "None"
    }

    print('Stage 2')
    for i in data:
        print(data[i])
        if data[i] is None:
            return f"There is no {data[i]} in request"
    db_sess = db_session.create_session()
    pack = db_sess.query(Measure).filter_by(id=int(data["id"])).first()

    print("Stage 3")
    if pack:
        pack.value = str(data["value"])
    else:
        measure = Measure(id=int(data["id"]), value=str(data["value"]))
        db_sess.add(measure)
    db_sess.commit()
    return "Succes"


@app.route("/addHandle", methods=["POST", "GET"])
def addHandle():
    return render_template("addHandle.html")


@app.route("/addDevice", methods=["POST", "GET"])
def addDevice():
    print("123123123")
    id = request.args["id"]
    lon = request.args["lon"]
    lat = request.args["lat"]
    wifiName = request.args["ssid"]
    wifiPassword = request.args["pwd"]

    db_sess = db_session.create_session()
    clone = db_sess.query(Can).filter_by(id=id).first()
    if clone:
        return "Id in DataBase", 403

    db_sess.add(
        Can(
            id=id, lon=lon, lat=lat,
            wifiName=wifiName, wifiPassword=wifiPassword
        )
    )
    db_sess.commit()
    return "Success"


@app.route("/addHandle/preloaded/<id>/<lon>/<lat>/<ssid>/<pwd>", methods=["GET", "POST"])
def addHandlePreloaded(id, lon, lat, ssid, pwd):
    identifier = id
    longitude = lon
    latitude = lat
    ssid = ssid
    password = pwd
    return render_template("addHandle.html",
                           identifier=identifier if identifier != "nil" else "",
                           longitude=longitude if longitude != "nil" else "",
                           latitude=latitude if latitude != "nil" else "",
                           ssid=ssid if ssid != "nil" else "",
                           password=password if password != "nil" else "")


@app.route("/read/<id>")
def readData(id):
    db_sess = db_session.create_session()
    pack = db_sess.query(Measure).filter_by(id=id).first()
    return render_template("readData.html", value=str(pack.value), identificator=str(id))


@app.route("/data")
def displayData():
    return render_template("data.html", mapbox_access_token=mapbox_access_token)


@app.route("/addRandom/<id>")
def addRandom(id):
    db_sess = db_session.create_session()
    measure = db_sess.query(Measure).filter_by(id=id).first()
    measure.value = randint(0, 101)
    db_sess.commit()
    return "Success"


@app.route("/mapPicker")
def mapPicker():
    return render_template("mapPicker.html")


@app.route("/getCansArray")
def getCansArray():
    # TOKEN acess
    token = request.headers["Authorization"]
    if token != "1235234jgdlr3452341slfej":
        return "Wrong Token", 401

    pack = {"cans": []}
    db_sess = db_session.create_session()
    data = db_sess.query(Measure).all()
    for m in data:
        id = m.id
        value = m.value

        info = db_sess.query(Can).filter_by(id=id).first()
        lon = info.lon
        lat = info.lat

        params = {
                "id": id,
                "lon": lon,
                "lat": lat,
                "fill": value
        }
        pack["cans"].append({"can": params})
    print(pack)
    redirect("/data")
    return jsonify(pack)


@app.route("/getMeasureByCanId")
def getMeasureByCanId():
    token = request.headers["Authorization"]
    if token != "1235234jgdlr3452341slfej":
        return "Wrong Token", 401

    id = request.args["id"]

    db_sess = db_session.create_session()
    data = db_sess.query(Measure).filter_by(id=id).first()

    pack = {
        "can": {
            "id": data.id,
            "value": data.value
        }
    }
    return data


@app.route("/getCanById")
def getCanById():
    token = request.headers["Authorization"]
    if token != "1235234jgdlr3452341slfej":
        return "Wrong Token", 401

    id = request.args["id"]

    print("0001")
    db_sess = db_session.create_session()
    data = db_sess.query(Can).filter_by(id=id).first()
    last = db_sess.query(Measure).filter_by(id=id).first()

    print("0002")

    pack = {
        "can": {
            "id": data.id,
            "lastValue": last.value,
            "lon": data.lon,
            "lat": data.lat,
            "wifiName": data.wifiName,
            "wifiPassword": data.wifiPassword
        }
    }
    print("0003")
    return pack


if __name__ == "__main__":
    db_session.global_init("data.db")
    app.run(host="0.0.0.0", port=3000)




