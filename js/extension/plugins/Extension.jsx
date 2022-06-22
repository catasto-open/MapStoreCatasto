import { name } from '../../../config';
import '../assets/style.css';
import burgerMenuContainer from "@js/extension/containers/BurgerMenu";
import SmartCatastoOpenPanel from "@js/extension/components/CatastoOpenPanel";


export default {
    name,
    component: SmartCatastoOpenPanel,
    epics: {
        ...require("@js/extension/epics/catastoOpen").default(),
        ...require("@js/extension/epics/resultGrid").default()
    },
    reducers: {
        catastoOpen: require('@js/extension/reducers/catastoOpen').default,
        resultGrid: require('@js/extension/reducers/resultGrid').default
    },
    containers: burgerMenuContainer
};
