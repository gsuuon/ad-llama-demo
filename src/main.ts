import { ad, loadModel, guessModelSpecFromPrebuiltId } from 'ad-llama'

const loadedModel = await loadModel(guessModelSpecFromPrebuiltId('Llama-2-7b-chat-hf-q4f32_1'))
const generator = ad(loadedModel)

const w = window as any
w.generator = generator

const { template, a } = generator(
 '<<sys>>You are a dungeon master. <</sys>>\n\n[INST] Create a character based on the Dungeons and Dragons universe.'
)

const result = template`
{
  "description": "${a('short description')}",
    "name": "${a('character name')}",
    "weapon": "${a('weapon')}",
    "class": "${a('class')}"
}
`

const asString = await result.collect()
console.log(asString)
console.dir(JSON.parse(asString))
