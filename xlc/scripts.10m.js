#!/usr/bin/env /usr/local/bin/node

const bitbar = require('./bitbar')
const execSync = require('child_process').execSync

const docker = '/usr/local/bin/docker'

let outputs = [
  {
    text: '❤',
    dropdown: false
  },
  bitbar.sep,
  'Scripts',
  {
    text: 'Release Keyboard',
    bash: '/bin/bash',
    param1: '/Users/bryan/scripts/release_keyboard.sh',
    // terminal: false,
  },
  {
    text: 'Steal Keyboard',
    bash: '/bin/bash',
    param1: '/Users/bryan/scripts/steal_keyboard.sh',
    // terminal: false,
  },
  {
    text: 'Mount Pi',
    bash: '/Users/bryan/scripts/mount_pi.sh',
    // terminal: false,
  },
]

try {
  const dockerContainers = execSync(`${docker} ps -a --format "{{.Names}} ({{.Image}})|{{.ID}}|{{.Status}}"`)
    .toString()
    .trim()
    .split('\n')
    .map((line) => {
      const [name, id, status] = line.split('|')
      let color;
      let cmd;
      if (status.indexOf('Exited') !== -1) {
        color = 'red'
        cmd = 'start'
      } else {
        color = 'green'
        cmd = 'stop'
      }
      return {
        text: name,
        refresh: true,
        color,
        bash: docker,
        param1: cmd,
        param2: id,
        terminal: false
      }
    })

    outputs = outputs.concat([
      bitbar.sep,
      'Docker Containers'
    ])
    outputs = outputs.concat(dockerContainers)
} catch (e) {
  
}

bitbar(outputs)
