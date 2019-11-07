import shajs from 'sha.js';

function hash(string?: string): string | undefined {
  return string
      ? shajs('sha256')
            .update(string)
            .digest('hex')
      : undefined;
}

export default hash;