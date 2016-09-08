#!/usr/bin/env /usr/local/bin/node

const bitbar = require('./bitbar')

bitbar([
  {
    text: '❤',
    dropdown: false
  },
  'Scripts',
  bitbar.sep,
  {
    text: 'Release Keyboard',
    bash: '~/scripts/release_keyboard.sh',
  },
  {
    text: 'Steal Keyboard',
    bash: '~/scripts/steal_keyboard.sh',
  },
  bitbar.sep,
])
