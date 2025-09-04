import ContentViews from './content/content';
import RoleViews from './promo/promo';
import AdminProductsViews from './products/product';
import HistoryViews from './history/history';
type Props = {
    activePage: string;
};


export default function AdminWrapper({ activePage }: Props) {
    if (activePage === "slider") {
        return <ContentViews status="slider" />;
    } else if (activePage === "promo") {
        return <RoleViews />;
    } else if (activePage === "products") {
        return <AdminProductsViews />;
    } else if (activePage === "history") {
        return <HistoryViews />;
    }

    return null;
}
