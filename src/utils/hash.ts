import shajs from 'sha.js';

function hash(input?: string): string | undefined {
  return input
      ? shajs('sha256')
            .update(input)
            .digest('hex')
      : undefined;
}

export default hash;