let lineIndex = 0
let lines = []
const converter = new showdown.Converter()
let otherChar

const setMode = (mode) => {
  $(".screen").hide()
  $(`.${mode}`).show()
}

const validLine = (idx) => {
  return idx >= 0 && idx < lines.length
}

const choosePlay = (playName) => {
  eval(`lines = ${playName}`)
}

const showLine = () => {
  const line = lines[lineIndex]
  const html = converter.makeHtml(line);

  $('.current-line').html(html)

  if (line.toLowerCase().includes(`#### ${otherChar}`.toLowerCase())){
    $('.current-line').css('opacity', 0.3)
  } else {
    $('.current-line').css('opacity', 1)
  }

  if (validLine(lineIndex - 1)) {
    $('.prev').removeClass('disabled')
  } else {
    $('.prev').addClass('disabled')
  }
  if (validLine(lineIndex + 1)) {
    $('.next').removeClass('disabled')
  } else {
    $('.next').addClass('disabled')
  }
}

const nextLine = () => {
  if (validLine(lineIndex+1)) {
    lineIndex++
    showLine()
  }
}
const prevLine = () => {
  if (validLine(lineIndex-1)) {
    lineIndex--
    showLine()
  }
}


// Choose role

$(() => {
  setMode('choose-reading')

  $('.story-option').click(function () {
    setMode('choose-char')
    $('.story-name').html($(this).html())
    choosePlay($(this).data('story'))
  })

  $('.char-option').click(function () {
    setMode('app-main')
    otherChar = $(this).data('other')
    showLine()
  })

  $('.prev').click(prevLine)
  $('.current-line').click(nextLine)
})
