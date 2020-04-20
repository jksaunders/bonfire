export const reconcileMediaQueries = (styles) => {
  if (styles.indexOf('@media') < 0) {
    return styles;
  }

  const mediaQueries = {};
  let noMediaQueriesString = '';

  const states = {
    INSIDE_MEDIA: 'INSIDE_MEDIA',
    INSIDE_MEDIA_SIGNATURE: 'INSIDE_MEDIA_SIGNATURE',
    OUTSIDE_MEDIA: 'OUTSIDE_MEDIA',
  };

  let state = states.OUTSIDE_MEDIA;
  let checkpoint = 0;
  let currentMedia = '';

  for (let i = 0; i < styles.length; i += 1) {
    if (
      i + 6 < styles.length &&
      styles.substring(i, i + 6) === '@media' &&
      state === states.OUTSIDE_MEDIA
    ) {
      noMediaQueriesString += `\n${styles.substring(checkpoint, i).trim()}`;
      state = states.INSIDE_MEDIA_SIGNATURE;
      checkpoint = i;
    } else if (
      styles.charAt(i) === '{' &&
      state === states.INSIDE_MEDIA_SIGNATURE
    ) {
      state = states.INSIDE_MEDIA;
      currentMedia = styles.substring(checkpoint, i).trim();
      checkpoint = i + 1;
    } else if (styles.charAt(i) === '}' && state === states.INSIDE_MEDIA) {
      if (!mediaQueries[currentMedia]) {
        mediaQueries[currentMedia] = styles.substring(checkpoint, i).trim();
      } else {
        mediaQueries[currentMedia] += `\n${styles
          .substring(checkpoint, i)
          .trim()}`;
      }
      state = states.OUTSIDE_MEDIA;
      checkpoint = i + 1;
    }
  }

  noMediaQueriesString += `\n${styles.substring(checkpoint).trim()}`;
  noMediaQueriesString = noMediaQueriesString.trim();

  let result = noMediaQueriesString;
  Object.keys(mediaQueries).forEach((k) => {
    result += `\n${k} {\n${mediaQueries[k]}\n}`;
  });

  result = result.trim();

  return result;
};
