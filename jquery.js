var images = ['./image/beach.svg', './image/robot.svg', './image/space.svg'];
  var total = images.length;
  var randomImages = shuffleArray(images);
  var clickedNum = 0; // số lần click mở cửa
  var currentStreak = 0; // số lần thắng liên tiếp
  var bestStreak = 0; // số lần thắng liên tiếp cao nhất
  var isLose = false; // thua?

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function showResult() {
    bestStreak = bestStreak > currentStreak ? bestStreak : currentStreak;
    $('#current-streak').text(currentStreak);
    $('#best-streak').text(bestStreak);
}

$('.door-container img').click(function () {
    clickedNum = clickedNum + 1;
    // chỉ xử lý khi chưa có kết quả thua/thắng
    if (clickedNum <= total && !isLose) {
      const url = randomImages[$(this).index()];
      $(this).attr('src', url);
      if (url === './image/robot.svg' && clickedNum < total) {
        // thua
        isLose = true;
        currentStreak = 0;
        $('.play-button button').html('Game over!</br>Play again?');
        showResult();
      }
      if (url === './image/robot.svg' && clickedNum === total) {
        // thắng
        currentStreak += 1;
        $('.play-button button').html('You win!</br>Play again?');
        showResult();
      }
    }
});

$('.play-button button').click(function () {
    isLose = false;
    $('.door-container img').attr('src', './image/closed_door.svg');
    $('.play-button button').html('Good luck!');
    randomImages = shuffleArray(images);
    clickedNum = 0;
});