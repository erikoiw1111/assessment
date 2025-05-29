'user strict';//厳格モード
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子をすべて削除する。
 * @param{HTMLElement}element HTMLの要素
 */
function removeAllChildren(element){
    while(element.firstChild){
        element.removeChild(element.firstChild);
    }
}

userNameInput.onkeydown=event=>{
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

assessmentButton.onclick = () => { //アロー関数表記。assessmentButton.onclick=function(){でもOK
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前が空の時は処理を終了する（ガード句）
        return;
    }
    console.log(userName);
    //TODO 診断結果表示のエリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph = document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);
    
    //TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor =document.createElement('a');
    const hrefValue='https://twitter.com/intent/tweet?button_hashtag='+
    encodeURIComponent('あなたのいいところ')+
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    anchor.className='twitter-share-button';//anchor.setAttribute('class','twitter-share-button');でもOK
    anchor.setAttribute('data-text',result);
    anchor.setAttribute('data-lang', 'ja');
    anchor.setAttribute('data-show-count', 'false');
    tweetDivided.appendChild(anchor);

    //widgets.jsの設定
    const script1=document.createElement('script');
    script1.setAttribute('src','http://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script1);

};
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところは眼差しです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさが物事をいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられてます。',
    '{userName}のいいところは見た目です。内側から溢れ出す{userName}の良さに皆が惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられてます。',
    '{userName}のいいところは思いやりです。{userName}に気にかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、分かり合うことが出来ます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人が魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**(コメント形式：JSDoc)
 * 名前を文字列に渡すと診断結果を返す関数
 * @param{string}userName ユーザー名
 * @return{string}診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCade = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCade = sumOfCharCade + userName.charCodeAt(i);
        //文字コード番号の合計を回答の回数で割って添字の数値を求める
        const index = sumOfCharCade % answers.length;
        let result = answers[index];
        result = result.replace(/\{userName\}/g, userName);

        //TODO{userName}をユーザーの名前に置き換える
        return result;
    }
}

//テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは感受性です。太郎が感じたことに皆が共感し、分かり合うことが出来ます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
)
console.assert(
    assessment('太郎') === assessment('太郎'),
    '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
)
