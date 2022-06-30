#!/usr/bin/env node

/**
 * It checks if a string is a valid IP address and port number
 * @param str - The string to be tested.
 * @returns A boolean value.
 */
function isValid_IP_and_Port(str) {
  const cong =
    /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  return cong.test(str);
}

/**
 * It extracts the port number from a string of the form `"xxx.xxx.xxx.xxx:yyyyy"` where `xxx` is an IP
 * address and `yyyyy` is a port number
 * @param str - the string to extract the port from
 * @returns The port number is being returned.
 */
function extractPort(str) {
  const cong =
    /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  const port = cong.exec(str);
  if (port) {
    return parseInt(port[5]);
  }
  console.log('function extractPort: invalid port, using default port 20777');

  return 20777;
}

/**
 * It takes a string and returns the IP address if it's valid, otherwise it returns an empty string
 * @param str - The string to be parsed.
 * @returns The IP address of the server.
 */
function extractIP(str) {
  const cong =
    /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9]):([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
  const result = cong.exec(str);
  if (result) {
    return result[1] + '.' + result[2] + '.' + result[3] + '.' + result[4];
  }
  return '';
}

/* It's an array that will hold the valid IP addresses and port numbers. */
const validArgs = [];
/* It's importing the dgram module. */
const dgram = require('dgram');
/* It's a variable that will hold the socket. */
let socket; // created on --forward command because
/* It's an array that will hold the valid IP addresses and port numbers. */
const args = process.argv.slice(2);
/* It's slicing the array of arguments from the third element. */
const args2 = process.argv.slice(3);
/* It's an array that will hold the valid log arguments. */
const ValidLogArgs = [];

/**
 * It takes an array of strings, and if the length of each string is between 0 and 11, it pushes it to
 * a new array
 * @param args2 - The arguments passed to the command
 */
function validateLogArgs(args2) {
  args2.map(x => {
    if (x.length >= 0 && x.length <= 11) {
      ValidLogArgs.push(x);
    }
  });
}

/* It's taking an array of strings, and if the length of each string is between 0 and 11, it pushes it
to a new array. */
validateLogArgs(args2);

/* It's creating a set of the valid log arguments. */
const setOfLogArgs = new Set(ValidLogArgs);

/* It's checking if the user has entered any arguments. */
if (args.length === 0) {
  console.error(`
    forwarding flags: -f or --forward
    forwarding args: ip:port
    Example: npx f1-22-udp -f 192.168.1.114:20777

    log flags: --log or -l
    log args: [package id]
    Example: npx f1-22-udp --log 1 2 3 4 5 6 7 8 9 10 11
    0: motion
    1: session
    2: lap data
    3: event
    4: participants
    5: car setups
    6: car telemetry
    7: car status
    8: final classification
    9: lobby info
    10: car damage
    11: session history

    Please enter the IP address and port number or use the --log falg.
    Forward Usage: Example: npx f1-22-udp [<IP>:<PORT>]
    Log Usage: Example: npx f1-22-udp --log [<PACKAGE ID>]

    `);
  /* It's exiting the process with an error code. */
  process.exit(1);
}

/* It's checking if the user has entered the `-f` or `--forward` flag. */
if (args[0] === '-f' || args[0] === '--forward') {
  /* It's creating a socket. */
  socket = dgram.createSocket('udp4');
  /* It's binding the socket to the port 20777 and the IP address 127.0.0.1. */
  socket.bind(20777, '127.0.0.1');
  /* It's checking if the user has entered any arguments. */
  if (args2.length == 0) {
    console.log(`
        Please enter the IP address and port number!

        Usage: Example: npx f1-22-udp [<IP>:<PORT>]

        Example: npx f1-22-udp -forward 192.168.1.114:20777
        `);
    /* It's exiting the process with an error code. */
    process.exit(1);
  }
  /* It's checking if the argument is a valid IP address and port number, if it is, it's extracting the
  IP address and port number and pushing them to an array. */
  args2.map(arg => {
    if (isValid_IP_and_Port(arg)) {
      const ip = extractIP(arg);

      const port = extractPort(arg);

      validArgs.push({ip: ip, port: port});
    } else {
      console.error(`
            "${arg}"'is not valid!
            
            Please enter the IP address and port number!

            Usage: Example: npx f1-22-udp [<IP>:<PORT>]

            Example: npx f1-22-udp -forward 192.168.1.114:20777
            `);
      /* It's exiting the process with an error code. */
      process.exit(1);
    }
  });
  /* It's calling the `forward` function. */
  forward();
}

/* It's checking if the user has entered the `--log` or `-l` flag. */
if (args[0] === '--log' || args[0] === '-l') {
  /* It's checking if the user has entered any arguments. */
  if (setOfLogArgs.size === 0) {
    console.log(`
        log flags: --log or -l
        log args: [package id]
        Example: npx f1-22-udp --log 1 2 3 4 5 6 7 8 9 10 11
        0: motion
        1: session
        2: lap data
        3: event
        4: participants
        5: car setups
        6: car telemetry
        7: car status
        8: final classification
        9: lobby info
        10: car damage
        11: session history
        `);
    /* It's exiting the process with an error code. */
    process.exit(1);
  }
  /* It's checking if the user has entered any arguments. */
  if (setOfLogArgs.size > 0) {
    console.log('using set of log args:', setOfLogArgs);
    /* It's calling the `log` function. */
    log();
  }
}

/**
 * The function `forward()` listens for incoming UDP packets on the port specified by the user, and
 * then forwards those packets to the IP addresses and ports specified by the user
 */
function forward() {
  socket.on('listening', () => {
    console.log(`
    listening on:  ${socket.address().address}:${socket.address().port}
`);
    /* It's logging the IP address and port number to the console. */
    validArgs.map(valid => {
      console.log(`forwarding to ${valid.ip}:${valid.port}`);
    });

    /* It's creating a new socket and sending the message to the IP address and port number specified
    by the user. */
    validArgs.map(valid => {
      const s2 = dgram.createSocket('udp4');
      socket.on('message', m => {
        s2.send(m, 0, m.length, valid.port, valid.ip, err => {
          /* It's checking if there is an error. */
          if (err) {
            console.log(err);
            /* It's exiting the process with an error code. */
            process.exit(1);
          }
        });
      });
    });
  });
}

/**
 * It logs the data from the F1 2021 game to the console.
 */
function log() {
  /* It's importing the `F1TelemetryClient` class from the `f1-22-udp` module. */
  const parser = require('f1-22-udp').F122UDP;
  console.log('loging..');
  /* It's creating a new instance of the `F1TelemetryClient` class. */
  const client = new parser();

  /* It's checking if the user has entered the `0` argument. */
  if (setOfLogArgs.has('0')) {
    client.on('motion', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `1` argument. */
  if (setOfLogArgs.has('1')) {
    client.on('session', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `2` argument. */
  if (setOfLogArgs.has('2')) {
    client.on('lapData', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `3` argument. */
  if (setOfLogArgs.has('3')) {
    client.on('event', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `4` argument. */
  if (setOfLogArgs.has('4')) {
    client.on('participants', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `5` argument. */
  if (setOfLogArgs.has('5')) {
    client.on('carSetups', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `6` argument. */
  if (setOfLogArgs.has('6')) {
    client.on('carTelemetry', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `7` argument. */
  if (setOfLogArgs.has('7')) {
    client.on('carStatus', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `8` argument. */
  if (setOfLogArgs.has('8')) {
    client.on('finalClassification', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `9` argument. */
  if (setOfLogArgs.has('9')) {
    client.on('lobbyInfo', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `10` argument. */
  if (setOfLogArgs.has('10')) {
    client.on('carDamage', data => {
      console.log(data);
    });
  }

  /* It's checking if the user has entered the `11` argument. */
  if (setOfLogArgs.has('11')) {
    client.on('sessionHistory', data => {
      console.log(data);
    });
  }

  /* It's starting the client. */
  client.start();
}
