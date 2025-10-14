import AxiosInstance from "../../http/AxiosInstance";

export const login = async (email, password) => {
    try {
        const axiosInstance = AxiosInstance();
        const url = '/auth/login';
        const body = {
            email: email,
            password: password
        };
        return await axiosInstance.post(url, body);
        // return await AxiosInstance().post(url, body);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// export const register = async (email, password) => {
//     try {
//         const axiosInstance = AxiosInstance();
//         const url = '/api/auth/register';
//         const body = {
//             email: email,
//             password: password
//         };
//         return await axiosInstance.post(url, body);
//         // return await AxiosInstance().post(url, body);
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// }

export const requestOTP = async (phoneNumber) => {
    try {
        console.log('Bắt đầu gửi yêu cầu OTP cho số:', phoneNumber);
        // Gọi đến Axios instance đã được cấu hình
        const response = await AxiosInstance().post('/api/auth/register', {
            phone: phoneNumber,
        });
        return response;
    } catch (error) {
        // Ném lỗi ra ngoài để component có thể bắt và xử lý
        console.error('Lỗi khi yêu cầu OTP:', error.response?.data || error.message);
        throw error;
    }
}

export async function verifyOtp(phone, code) {
    try {
        // gọi API
        const response = await AxiosInstance().post('/api/auth/verify-register', {
            phone: phone,
            code: code,
        });
        // Nếu thành công, trả về dữ liệu
        return response;
    } catch (error) {
        // Nếu thất bại, lấy thông báo lỗi và NÉM nó ra
        const errorMessage = error.response?.data?.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.';
        throw new Error(errorMessage);
    }
}