import React, {useState, useEffect, useRef} from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import {Camera, CameraType} from 'expo-camera'; 
import * as MediaLibrary from 'expo-media-library'
import CameraButtons from '../components/CameraButtons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';


const Analyzer = () => {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [image, setImage] = useState(null); 
    const [type, setType]  = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const cameraRef = useRef(null);
    const navigation = useNavigation();


    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync(); 
            const cameraStatus = await Camera.requestCameraPermissionsAsync(); 
            setHasCameraPermission(cameraStatus.status === 'granted');
        })(); 
    }, [])


    // Function to handle image selection
    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    const takePicture = async () => {
        if(cameraRef){
            try {
                const data = await cameraRef.current.takePictureAsync();
                console.log(data);
                setImage(data.uri);
            } catch(e){
                console.log(error)
            }
        }
    }

    const saveImage = async () => {
        if(image){
            try{
                await MediaLibrary.createAssetAsync(image);
                alert('Picture saved!');
                navigation.navigate('Model', { imageUri: image });
                setImage(null);
            }catch(e){
                console.log(error)
            }
        }
    }
    

    if(hasCameraPermission === false) {
        return <Text>Access Denied to Camera</Text>
    }

    return(
        <View style={styles.container}>
            {!image ? 
            <Camera
                style={styles.camera}
                type={type}
                flashMode={flash}
                ref={cameraRef}
            >
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    padding:30,
                }}>
                    <CameraButtons icon={'retweet'} onPress={() => {setType(type === CameraType.back ? CameraType.front : CameraType.back)}}/>
                    <CameraButtons icon={'flash'} 
                    color={flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'}
                    onPress={() => {setFlash(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.on: Camera.Constants.FlashMode.off)}}/>
                </View>
         </Camera>
         :
         <Image source={{uri: image}} style={styles.camera}/>
             }
         <View>
            {image ? 
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 50
            }}>
                <CameraButtons title={'Re-take'} icon='retweet' onPress={() => setImage(null)}/>
                <CameraButtons title={'Save'} icon='check' onPress={saveImage}/>
            </View>
            :
            <CameraButtons title={'Take a picture'} icon="camera" onPress={takePicture}/>
            }
                <View style={{ alignItems: 'center', }}>
                <CustomButton
                    text="Pick Image"
                    onPress={pickImage}
                />
                </View>
         </View>
        </View>
    );
}

export default Analyzer

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#000',
        justifyContent: 'center',
        paddingBottom: 5
    },
    camera: {
        flex:1,
        borderRadius: 20,
    }
})

