import React from 'react';
import {Text} from 'react-native';
import {findAll} from 'highlight-words-core';
import PropTypes from 'prop-types';

Highlighter.propTypes = {
    autoEscape: PropTypes.bool,
    highlightStyle: Text.propTypes.style,
    searchWords: PropTypes.arrayOf(PropTypes.string).isRequired,
    textToHighlight: PropTypes.string.isRequired,
    sanitize: PropTypes.func,
    style: Text.propTypes.style
};

/**
* Highlights all occurrences of search terms (searchText) within a string (textToHighlight).
* This function returns an array of strings and <Text> elements (wrapping highlighted words).
*/
export default function Highlighter({
    autoEscape,
    highlightStyle,
    searchWords,
    textToHighlight,
    sanitize,
    style,
    ...props
}) {
    const chunks = findAll({textToHighlight, searchWords, sanitize, autoEscape});
    var new_chunks = []
    var index = []
    var count = 0
    for (var i = 0; i < chunks.length; i++) {
      if (chunks[i].highlight == true) {
        ++count
        if (count > 1) {
          chunks[i].highlight = false
        }
      }
    }

    if (new_chunks.length > 0) {
      return (
          <Text style={style} {...props}>
              {new_chunks.map((chunk, index) => {
                  const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
                  return (!chunk.highlight)
                      ? text
                      : (
                          <Text
                              key={index}
                              style={chunk.highlight && highlightStyle}
                          >
                              {text}
                          </Text>
                      );
              })}
          </Text>
      );
    }else {
      return (
          <Text style={style} {...props}>
              {chunks.map((chunk, index) => {
                  const text = textToHighlight.substr(chunk.start, chunk.end - chunk.start);
                  return (!chunk.highlight)
                      ? text
                      : (
                          <Text
                              key={index}
                              style={chunk.highlight && highlightStyle}
                          >
                              {text}
                          </Text>
                      );
              })}
          </Text>
      );
    }
}
