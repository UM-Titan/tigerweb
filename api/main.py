from fastapi.responses import FileResponse
from typing import Union, Optional
import uvicorn, json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
import pandas as pd 
import json, shutil, os
from datetime import datetime
from os import getcwd, path


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "I am a dude"}

@app.get("/pic/{street}/{fname}")
async def main(street,fname):
    fpath = os.path.join('images',street+'/'+fname)
    # fpath = os.path.join('BATT/Sections',street+'/'+fname)
    return FileResponse(fpath)

@app.get("/batt/{street}/{fname}")
async def main(street,fname):
    fpath = os.path.join('images_batt',street+'/'+fname)
    # console.log(fpath)
    # fpath = os.path.join('BATT/Sections',street+'/'+fname)
    return FileResponse(fpath)

@app.get("/jeffcity/{street}/{fname}")
async def main(street,fname):
    fpath = os.path.join('jeffcity/images',street+'/'+fname)
    return FileResponse(fpath)

# @app.get("/pave.geojson")
# def read_wzdx():
#     f = open('batt_vis.geojson')
#     gdf_testdata = json.load(f)

#     return gdf_testdata

@app.get("/jeffcity.geojson")
def read_wzdx():
    # f = open('jeff_city_test___.geojson')
    # f = open('jeffcity/jeffcity_.geojson')
    f = open('jeffcity/jeffcity.geojson')
    gdf_testdata = json.load(f)

    return gdf_testdata

if __name__ == '__main__':
     uvicorn.run('main:app', host='0.0.0.0', port=8000, reload=True,
     ssl_keyfile = '/etc/letsencrypt/live/tiger.ridsi-dash.com/privkey.pem',
     ssl_certfile = '/etc/letsencrypt/live/tiger.ridsi-dash.com/fullchain.pem'
     )
