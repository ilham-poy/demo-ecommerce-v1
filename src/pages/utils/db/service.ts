import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import app from "./firebase";
import bcrypt from 'bcryptjs'
import { put } from "@vercel/blob";



const firestore = getFirestore(app);



export async function retrieveData(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}



export async function retrieveDataById(collectionName: string, id: string) {
    const snapshot = await getDoc(doc(firestore, collectionName, id));
    const data = snapshot.data();
    return data;

}
export async function signIn(userData: { email: string }) {
    const q = query(collection(firestore, 'users'), where('email', '==', userData.email));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    if (data) {
        return data[0]
    }
}
export async function signUp(userData:
    { email: string; fullname: string; password: string; role?: string },
    callback: Function) {
    const q = query(collection(firestore, 'users'), where('email', '==', userData.email));

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }));
    if (data.length > 0) {

        callback({ status: false, message: "Email Already exists" });

    } else {
        userData.password = await bcrypt.hash(userData.password, 10);
        userData.role = 'buyyer';
        await addDoc(collection(firestore, 'users'), userData).then(() => {
            callback({ status: true, messagge: 'Register Success' })
        }).catch((error) => {
            callback({ status: false, messagge: error })

        })
    }
}

export async function getContent(collectionName: string) {
    const snapshot = await getDocs(collection(firestore, collectionName));

    const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return data;
}
import { del } from '@vercel/blob';
export async function sendContentById(
    contentData:
        { id: string, active: boolean, 'hero-image': boolean, "image-link": string, image: string, name: string },
    callback: Function) {

    // kalo si image kosong  atau undifined jangan delete image
    if (contentData.image === undefined) {
        const contentId = doc(firestore, 'content', contentData.id);
        await updateDoc(contentId, contentData).then(() => {
            callback({ status: true, messagge: 'Update Content Success' })
        }).catch((error) => {
            callback({ status: false, messagge: error })
        })
    } else {
        await del(contentData['image-link']);
        const contentId = doc(firestore, 'content', contentData.id);
        await updateDoc(contentId, contentData).then(() => {
            callback({ status: true, messagge: 'Update Content Success' })
        }).catch((error) => {
            callback({ status: false, messagge: error })
        })
    }

}

export async function deleteContentById(contentDelete:
    { id: string, image: string, active: boolean }, callback: Function) {
    const contentId = doc(firestore, 'content', contentDelete.id);
    await del(contentDelete.image);
    await deleteDoc(contentId).then(() => {
        callback({ status: true, messagge: 'Delete Content Success' })
    }).catch((error) => {
        callback({ status: false, messagge: error })
    })
}


export async function createContent(
    contentData: { id?: string; active: boolean; "hero-image": boolean; image: string; name: string },
    callback: Function
) {
    try {
        const docRef = await addDoc(collection(firestore, "content"), contentData);
        await updateDoc(doc(firestore, "content", docRef.id), {
            ...contentData,
            id: docRef.id,
        });

        callback({ status: true, message: "Create Content Success" });
    } catch (error: any) {
        callback({ status: false, message: error.message });
    }
}



export async function createProduct(productData: {
    name: string;
    sku: string;
    image: File[];
    stock: number;
    price: number;
    affiliate: string;
    IsAffiliate: boolean;
    status: boolean;
    discount: number;
    discount_status: boolean;
    description: string;
}, callback: Function) {
    // console.log(productData);
    try {
        const docRef = await addDoc(collection(firestore, "products"), productData);
        await updateDoc(doc(firestore, "products", docRef.id), {
            ...productData,
            id: docRef.id,
        });

        callback({ status: true, message: "Create Content Success" });
    } catch (error: any) {
        callback({ status: false, message: error.message });
    }

}
export async function sendProductById(productData: {
    id: string,
    name: string;
    sku: string;
    image: File[];
    stock: number;
    price: number;
    affiliate: string;
    IsAffiliate: boolean;
    status: boolean;
    discount: number;
    discount_status: boolean;
    description: string;
}, callback: Function) {


    try {
        // console.log(productData);
        const productRef = doc(firestore, 'products', productData.id);
        if (productData.image) {
            // Ambil Product dan image dari product
            const snapshot = await getDoc(productRef);
            const existingData = snapshot.data();
            const existingImages = existingData?.image || [];

            // Gabungin Image product lama dengan product baru
            const newImages = productData.image;
            const updatedImages = [...existingImages, ...newImages];
            await updateDoc(productRef, {
                ...productData,
                image: updatedImages,
            }).then(() => {
                callback({ status: true, messagge: 'Update Content Success' })
            }).catch((error) => {
                callback({ status: false, messagge: error })
            })
        } else {
            await updateDoc(productRef, productData).then(() => {
                callback({ status: true, messagge: 'Update Content Success' })
            }).catch((error) => {
                callback({ status: false, messagge: error })
            })
        }
    } catch (error: any) {
        callback({ status: false, message: error.message });
    }
}

export async function deleteImageProduct(imageData: { image: string, id: string }, callback: Function) {
    try {

        console.log(imageData);


        // Hapus image dari storage
        await del(imageData.image);
        const productRef = doc(firestore, "products", imageData.id);
        const productSnap = await getDoc(productRef);

        if (!productSnap.exists()) {
            return callback({ status: false, message: "Product not found" });
        }

        const productData = productSnap.data();
        const currentImages: string[] = productData.image || [];

        // cureentimages hanya menerima url image yang berbeda dengan (image yang di parameter || imageData.image)
        const updatedImages = currentImages.filter((img) => img !== imageData.image);

        await updateDoc(productRef, {
            image: updatedImages,
        });

        callback({ status: true, message: "Image deleted successfully" });
    } catch (error: any) {
        callback({ status: false, message: `Failed to delete image: ${error.message}` });
    }
}


export async function deleteProductById(productDelete: { id: string }, callback: Function) {
    try {
        const productRef = doc(firestore, 'products', productDelete.id);
        const snapshot = await getDoc(productRef);
        const existingData = snapshot.data();
        const existingImages = existingData?.image;

        existingImages.forEach((image: string) => {
            del(image);
        });
        // if (existingData?.image.length == 0) {
        await deleteDoc(productRef).then(() => {
            callback({ status: true, messagge: 'Delete Content Success' })
        }).catch((error) => {
            callback({ status: false, messagge: error })
        })
        // }
    } catch (error: any) {
        callback({ status: false, message: error.message });
    }
}
