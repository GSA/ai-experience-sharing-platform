import React from 'react';
import { LoremIpsum } from 'react-lorem-ipsum';

export default ({ chunks = 3, chunkSize = 6, lineSize = 10 }) => (
  <LoremIpsum
    p={chunks}
    avgSentencesPerParagraph={chunkSize}
    avgWordsPerSentence={lineSize}
    startWithLoremIpsum={false}
  />
);
