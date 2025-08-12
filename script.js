let playerName = '';
let apiKey = '';

function caesarShiftDecode(str, shift) {
  return str.split('').map(char => 
    String.fromCharCode(char.charCodeAt(0) - shift)
  ).join('');
}

async function loadApiKey() {
  const res = await fetch('API.txt');
  const encodedKey = (await res.text()).trim();
  apiKey = caesarShiftDecode(encodedKey, 5); // decode the gibberish
}

document.getElementById('saveName').addEventListener('click', () => {
  playerName = document.getElementById('playerName').value || 'Player';
  document.getElementById('name-prompt').style.display = 'none';
});

document.getElementById('sendBtn').addEventListener('click', sendMessage);

async function sendMessage() {
  const inputEl = document.getElementById('userInput');
  const message = inputEl.value.trim();
  if (!message) return;

  addMessage(`${playerName}: ${message}`, 'user');
  inputEl.value = '';

  let prompt = `You are MineBot. Only answer Minecraft questions with specific commands if needed. If question is not Minecraft related, reply: "That's not my field. Ask ChatGPT here: https://chatgpt.com/". User: ${message}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || 'Error getting response';
  addMessage(`MineBot: ${botReply}`, 'bot');
}

function addMessage(text, sender) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

loadApiKey();
