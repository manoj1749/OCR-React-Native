import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import TesseractOcr, { LANG_ENGLISH, LEVEL_WORD } from 'react-native-tesseract-ocr';

const App = () => {
  const [imageSource, setImageSource] = useState(null);
  const [extractedText, setExtractedText] = useState('');

  const selectImage = () => {
    ImagePicker.showImagePicker({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel) {
        setImageSource(response.uri);
        extractText(response.uri);
      }
    });
  };

  const extractText = async (imageUri) => {
    try {`  `
      const tessOptions = {
        whitelist: null,
        blacklist: '1234567890',
        level: LEVEL_WORD,
        lang: LANG_ENGLISH,
      };

      const extracted = await TesseractOcr.recognize(imageUri, 'LANG_ENGLISH', tessOptions);
      setExtractedText(extracted);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {imageSource && <Image source={{ uri: imageSource }} style={{ width: 200, height: 200 }} />}
      <Text>{extractedText}</Text>
      <Button title="Select Image" onPress={selectImage} />
    </View>
  );
};

export default App;
