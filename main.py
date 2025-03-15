#!/usr/bin/env /home/martin/.cache/pypoetry/virtualenvs/waybar-cbond-index--xhz-acO-py3.13/bin/python

import sys
import json

import requests

JSL_URL = "	https://www.jisilu.cn/webapi/cb/index_quote/"

def get_cbond_index():
    data = requests.get(JSL_URL).json()
    cur_index = data["data"]["cur_index"]
    cur_increase_rt = data["data"]["cur_increase_rt"]

    output_obj = {
        "text": f"C {cur_index} {cur_increase_rt:+}%",
        "tooltip": "",
        # "class": "",
    }

    return output_obj

def main():
    output_obj = get_cbond_index()
    sys.stdout.write(json.dumps(output_obj))

if __name__ == "__main__":
    main()
