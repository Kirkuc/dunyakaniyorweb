from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = SECRET_KEY

db = SQLAlchemy(app)

class Kullanici(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    kullanici_adi = db.Column(db.String(20), unique=True, nullable=False)
    tag = db.Column(db.String(50), nullable=True, default='')
    kayit_tarihi = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def __repr__(self):
        return f"Kullanıcı('{self.kullanici_adi}', '{self.tag}')"

@app.route('/')
def ana_sayfa():
    return render_template('index.html')

@app.route('/forum')
def forum_sayfa():
    return render_template('forum.html')

@app.route('/konu')
def konu_sayfa():
    return render_template('konu.html')

@app.route('/lore')
def lore_sayfa():
    return render_template('lore.html')

@app.route('/lore/kizil-yagmur')
def lore_kizil_yagmur_sayfa():
    return render_template('lore-kizil-yagmur.html')

@app.route('/bolumler')
def bolumler_sayfa():
    return render_template('bolumler.html')

@app.route('/sohbet')
def sohbet_sayfa():
    return render_template('sohbet.html')

@app.route('/uyeler')
def uye_sayfa():
    uyeler = Kullanici.query.order_by(Kullanici.kayit_tarihi).all()
    return render_template('uyeler.html', uyeler=uyeler)

if __name__ == '__main__':
    app.run(debug=True)
