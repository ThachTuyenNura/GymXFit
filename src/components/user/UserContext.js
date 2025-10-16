import React, { createContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from './UserHTTP';

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hàm này chỉ dùng khi ĐĂNG NHẬP hoặc ĐĂNG KÝ
  const login = useCallback(async (token) => {
    setIsLoading(true);
    setUserToken(token);
    await AsyncStorage.setItem('token', token);
    try {
      const response = await getProfile();
      if (response.ok && response.user) {
        setUser(response.user);
      }
    } catch (e) {
      console.error("Lỗi khi lấy profile sau khi đăng nhập:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // <<< THÊM: Hàm logout để quản lý việc xóa token và cập nhật state
  const logout = async () => {
    setIsLoading(true);
    setUser(null);
    setUserToken(null);
    await AsyncStorage.removeItem('token');
    setIsLoading(false);
  };

  // Hàm này chỉ có một nhiệm vụ: gọi lại getProfile và cập nhật state `user`.
  // Nó không đụng đến token.
  const refreshUser = useCallback(async () => {
    console.log('Bắt đầu làm mới thông tin người dùng...');
    try {
      const response = await getProfile();
      if (response.ok && response.user) {
        setUser(response.user); // Chỉ cập nhật lại đối tượng user
        console.log('Làm mới thông tin thành công!');
      }
    } catch (e) {
      console.error("Lỗi khi làm mới thông tin user:", e);
    }
  }, []);

  // <<< THÊM: Hàm tự động kiểm tra token khi app khởi động
  // Hàm này chạy một lần duy nhất khi app khởi động
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          await login(token); // Dùng lại hàm login để lấy cả token và user
        }
      } catch (e) {
        console.error('Lỗi khi kiểm tra trạng thái đăng nhập:', e);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, [login]);

  return (
    <UserContext.Provider value={{ user, userToken, isLoading, login, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};
