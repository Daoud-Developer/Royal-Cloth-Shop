import {createContext,useState, useEffect} from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils.js';


export const CategoriesContext = createContext({
    categoriesMap: {},
  });

export const CategoriesProvider = ({children}) => {

const [categoriesMap, setcategoriesMap] = useState({});

useEffect(() => {

    const getcategoriesMap = async () => {
        const categoryMap = await getCategoriesAndDocuments();
        setcategoriesMap(categoryMap);
        // console.log(categoryMap);
    }

    getcategoriesMap()
}, []);

const value = { categoriesMap };

return (
    <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>

)
};
