(function () {
  var top = document.createElement('div')
  var timer = null
  top.setAttribute('id', 'return-top')
  top.innerText = 'TOP'

  top.addEventListener( 'click', function () {
    cancelAnimationFrame( timer );
    //获取当前毫秒数
    var startTime = +new Date();
    //获取当前页面的滚动高度
    var b = document.body.scrollTop || document.documentElement.scrollTop;
    var d = 500;
    var c = b;
    timer = requestAnimationFrame( function func () {
      var t = d - Math.max( 0, startTime - ( +new Date() ) + d )
      document.documentElement.scrollTop = document.body.scrollTop = t * ( -c ) / d + b;
      timer = requestAnimationFrame( func )
      if ( t == d ) {
        cancelAnimationFrame( timer )
      }
    } )
  })


  window.addEventListener( 'scroll', function () {
    if ( document.documentElement.scrollTop + document.body.scrollTop > 0 ) {
      top.style.display = 'block'
    } else {
      top.style.display = 'none'
    }
  }, false )

  document.body.appendChild( top )
})()