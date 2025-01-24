#!/usr/bin/env /home/martin/.cache/pypoetry/virtualenvs/waybar-cbond-index--xhz-acO-py3.13/bin/python

import sys
import json

import requests

JSL_URL = "	https://www.jisilu.cn/webapi/cb/index_quote/"

def main():
    data = requests.get(JSL_URL).json()
    cur_index = data["data"]["cur_index"]
    cur_increase_rt = data["data"]["cur_increase_rt"]

    output_obj = {
        "text": f"C {cur_index} {cur_increase_rt:+}%",
        "tooltip": "",
        # "class": "",
    }

    sys.stdout.write(json.dumps(output_obj))

if __name__ == "__main__":
    main()
