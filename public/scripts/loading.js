async function checkStatus(email){
    const status = await fetch('/checkStatus', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    const result = await status.json();
    console.log(result)
    return result.status
}
async function main() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if(!user) {
        window.location.href = '/register_student.html';
    }
    const email = user.email
    const result = await checkStatus(email);
    console.log(result)
    sessionStorage.setItem('status', result);
    window.location.href = getUrlQueries().redirect;
}


main()

function getUrlQueries() {
    var queryStr = window.location.search.slice(1);  // 文頭?を除外
        queries = {};
        
    // クエリがない場合は空のオブジェクトを返す
    if (!queryStr) {
      return queries;
    }
    
    // クエリ文字列を & で分割して処理
    queryStr.split('&').forEach(function(queryStr) {
      // = で分割してkey,valueをオブジェクトに格納
      var queryArr = queryStr.split('=');
      queries[queryArr[0]] = queryArr[1];
    });
    
    return queries;
  }