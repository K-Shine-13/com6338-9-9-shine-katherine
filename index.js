const getPoemBtn = document.getElementById('get-poem')
const poemEl = document.getElementById('poem')
const poemURL = 'https://poetrydb.org/random,linecount/1;12/author,title,lines.json'

const getJSON = url => fetch(url).then(res => res.json())

const pipe = (...fns) => firstArg => fns.reduce((returnValue, fn) => fn(returnValue), firstArg)

const makeTag = tag => str => `<${tag}>${str}</${tag}>`

// complete this function
const makePoemHTML = (data) => {
  const poem = data[0]
  const { title, author, lines } = poem

  // makeTag constants
  const makeH2 = makeTag('h2')
  const makeH3 = makeTag('h3')
  const makeEm = makeTag('em')
  const makeP = makeTag('p')

  // API data --> lines array
  // For each line in "lines"
  const stanzas = lines.reduce((acc, line) => {
    // If line is an empty string --> start new stanza & add a new empty array to acc
    if (line === '') {
      acc.push([])

    // Else, add line to current stanza
    } else {

      // Push the line to the current stanza
      acc[acc.length - 1].push(line)
    }
    return acc
  }, [[]])

  // Convert stanza array --> <p> with <br> between lines (no trailing <br>)
  const makeStanzaHTML = pipe(
    stanza => stanza.join('<br>'),
    makeP
  )

  const stanzasHTML = stanzas.map(makeStanzaHTML).join('')

  // Title & author write-outs
  const titleHTML = makeH2(title)
  const authorHTML = makeH3(makeEm(`by ${author}`))

  return `${titleHTML}${authorHTML}${stanzasHTML}`
}

// attach a click event to #get-poem
getPoemBtn.onclick = async function() {
  // renders the HTML string returned by makePoemHTML to #poem
  poemEl.innerHTML = makePoemHTML(await getJSON(poemURL))
}
