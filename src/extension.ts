import * as vscode from 'vscode';
import axios from 'axios';

const JSL_URL = "https://www.jisilu.cn/webapi/cb/index_quote/";

export function activate(context: vscode.ExtensionContext) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = 'cbond-index.showIndex';
    context.subscriptions.push(statusBarItem);

    async function updateStatusBarItem() {
        try {
            const response = await axios.get(JSL_URL);
            const data = response.data.data;
            const curIndex = data.cur_index;
            const curIncreaseRt = data.cur_increase_rt;

            statusBarItem.text = `C ${curIndex} ${curIncreaseRt >= 0 ? '+' : ''}${curIncreaseRt}%`;
            statusBarItem.show();
        } catch (error) {
            statusBarItem.text = 'Failed to fetch index';
            statusBarItem.show();
        }
    }

    let disposable = vscode.commands.registerCommand('cbond-index.showIndex', () => {
        updateStatusBarItem();
        vscode.window.showInformationMessage('Convertible Bond Index updated.');
    });

    context.subscriptions.push(disposable);

    // Update the status bar item immediately
    updateStatusBarItem();

    // Optionally, update the status bar item periodically
    setInterval(updateStatusBarItem, 60000); // Update every 60 seconds
}

export function deactivate() {}