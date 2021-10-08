import { sendSlackMessage } from './sendMessage'

const greetings: string[] = [
  'Hello',
  'Hi',
  'Hej',
  'Whatsup',
  'Shoo',
  'Hejsan',
  'Sup',
]
const sadEmotions: string[] = [
  'anger',
  'fear',
  'sadness',
  'disgust',
  'stress',
  'worry',
  'confused',
  'sad', 
  'stressful',
  'tired', 
  'bored'
]
const happyEmotions: string[] = [
  'enyoment',
  'happiness',
  'love',
  'relief',
  'joy',
  'satisfaction',
  'pride',
  'happy', 
  'great'
]
const mind: string[] = ['overthink', 'overthinking', 'mind', 'brain'];
const difficulties: string[] = ['cant', 'not', 'dont', 'how', 'bug', 'error'];
const endOfCoversation: string[] = ['Thank', 'Bye', 'Thanks', 'See', 'Hejdå'];
const talk: string[] = ['talk'];
const somethingMore: string[] = ['listening'];

export const handleMessageFromUser = async (payload: any): Promise<any> => {
  if (findValue(payload, greetings)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> Hi, what can I help you with?`,
    )
  } else if (findValue(payload, talk)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> Tell me, I'm listening?`,
    )
  } else if (findValue(payload, happyEmotions)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> What do you think makes you feel like?`,
    )
  } else if (findValue(payload, sadEmotions)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> What do you think brings up these emotions?`,
    )
  } else if (findValue(payload, mind)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> What do you think takes you to that state of mind?`,
    )
  } else if (findValue(payload, difficulties)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> Try to explain it?`,
    )
  } 
  else if (findValue(payload,somethingMore)) { 
    await sendSlackMessage(payload,
      `<@${payload.event.user}> Of course, I'm always here :sunglasses:`)
  }
  
  else if (findValue(payload, endOfCoversation)) {
    await sendSlackMessage(
      payload,
      `<@${payload.event.user}> Hope to talk soon! :heart:`,
    )
  }
  // we could add a rection here as well
}

const findValue = (payload: any, arrayType: any): any => {
  const userInput: string[] = payload.event.text.split(' ')
  const lowercasedUserInput = userInput.map((user) => user.toLowerCase())
  const lowercasedArrayType = arrayType.map((type) => type.toLowerCase())

  return lowercasedUserInput.some((word) => lowercasedArrayType.includes(word))
}
