import sys
import json

import requests

JSL_URL = "	https://www.jisilu.cn/webapi/cb/index_quote/"


def get_jisilu_data():
    return requests.get(JSL_URL, timeout=10).json()


def main():
    data = get_jisilu_data()
    cur_index = data["data"]["cur_index"]
    cur_increase_rt = data["data"]["cur_increase_rt"]

    output_obj = {
        "text": f"C {cur_index} {cur_increase_rt:+}%",
        "tooltip": "",
        # "class": "",
    }

    sys.stdout.write(json.dumps(output_obj))
