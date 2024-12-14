import React, { useRef, useState, useCallback, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert, Linking } from 'react-native';
import { Camera, useCameraDevices, useCameraPermission, useCameraDevice} from 'react-native-vision-camera';
import Tts from 'react-native-tts';

const VisionCameraScreen = () => {
  const [cameraPosition, setCameraPosition] = useState('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = useCameraDevice(cameraPosition);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = useCallback(async () => {
    if (!hasPermission) {
      const newPermission = await requestPermission();
      if (!newPermission) {
        Alert.alert(
          'Cần quyền truy cập',
          'Ứng dụng cần quyền truy cập camera để hoạt động',
          [
            {
              text: 'Đi đến Cài đặt',
              onPress: () => Linking.openSettings(),
            },
            {
              text: 'Hủy',
              style: 'cancel',
            },
          ],
        );
        Tts.speak('Ứng dụng cần quyền truy cập camera để hoạt động');
      } else {
        Tts.speak('Đã được cấp quyền truy cập camera');
      }
    }
  }, [hasPermission, requestPermission]);

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition(p => (p === 'back' ? 'front' : 'back'));
    Tts.speak('Đã chuyển đổi camera');
  }, []);

  const takePicture = useCallback(async () => {
    if (camera.current) {
      try {
        const photo = await camera.current.takePhoto();
        console.log(photo.path);
        Tts.speak('Đã chụp ảnh. Đang xử lý...');
        // Ở đây, bạn sẽ gửi ảnh đến API của bạn để xử lý và sinh chú thích
        // Sau đó, bạn có thể đọc to kết quả bằng Tts.speak()
      } catch (error) {
        console.error('Lỗi khi chụp ảnh:', error);
        Tts.speak('Có lỗi xảy ra khi chụp ảnh');
      }
    }
  }, []);

  if (device == null) {
    return (
      <View style={styles.centered}>
        <Text>Đang tải camera...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          Vui lòng cấp quyền truy cập camera để sử dụng ứng dụng
        </Text>
        <TouchableOpacity style={styles.button} onPress={checkPermission}>
          <Text style={styles.buttonText}>Yêu cầu quyền truy cập</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={toggleCameraPosition} style={styles.button}>
          <Text style={styles.buttonText}>Đổi camera</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePicture} style={styles.button}>
          <Text style={styles.buttonText}>Chụp ảnh</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 14,
    color: 'black',
  },
  permissionText: {
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VisionCameraScreen;

