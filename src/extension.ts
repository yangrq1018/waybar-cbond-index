import * as vscode from 'vscode';
import axios from 'axios';

const JSL_URL = "https://www.jisilu.cn/webapi/cb/index_quote/";

export function activate(context: vscode.ExtensionContext) {
    let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    context.subscriptions.push(statusBarItem);

    let latestCurIndex = '';

    async function updateStatusBarItem() {
        try {
            const response = await axios.get(JSL_URL);
            const data = response.data.data;
            const curIndex = data.cur_index;
            const curIncreaseRt = data.cur_increase_rt;

            latestCurIndex = curIndex.toString();

            statusBarItem.text = `等权 ${curIndex} ${curIncreaseRt >= 0 ? '+' : ''}${curIncreaseRt}%`;
            statusBarItem.show();
        } catch (error) {
            statusBarItem.text = 'Failed to fetch index';
            statusBarItem.show();
        }
    }

    statusBarItem.command = 'cbond-index.copyIndex';
    statusBarItem.tooltip = 'Click to copy index';
    statusBarItem.show();

    let copyIndexDisposable = vscode.commands.registerCommand('cbond-index.copyIndex', async () => {
        if (latestCurIndex) {
            await vscode.env.clipboard.writeText(latestCurIndex);
            vscode.window.showInformationMessage(`Index ${latestCurIndex} copied to clipboard.`);
        }
    });

    context.subscriptions.push(copyIndexDisposable);

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