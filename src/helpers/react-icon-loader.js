/**
 * Created by jkenny on 07/09/2017.
 */
import { ic_sync } from 'react-icons-kit/md/ic_sync';
import { ic_security } from 'react-icons-kit/md/ic_security';
import { arrow_right } from 'react-icons-kit/ikons/arrow_right';
import { ic_timelapse } from 'react-icons-kit/md/ic_timelapse';
import { ic_library_books } from 'react-icons-kit/md/ic_library_books';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle';
import { ic_radio_button_unchecked } from 'react-icons-kit/md/ic_radio_button_unchecked';
import { ic_refresh } from 'react-icons-kit/md/ic_refresh';
import { ic_contacts } from 'react-icons-kit/md/ic_contacts';
import { ic_trending_up } from 'react-icons-kit/md/ic_trending_up';
import { ic_settings } from 'react-icons-kit/md/ic_settings';
import { ic_zoom_out_map } from 'react-icons-kit/md/ic_zoom_out_map';
import { ic_storage } from 'react-icons-kit/md/ic_storage';
import { ic_device_hub } from 'react-icons-kit/md/ic_device_hub';
import { ic_people } from 'react-icons-kit/md/ic_people';
import { ic_view_module } from 'react-icons-kit/md/ic_view_module';
import { ic_desktop_mac } from 'react-icons-kit/md/ic_desktop_mac';

export const mapIconNameToObject = (name) => {
    switch (name) {
        case "ic_sync":
            return ic_sync;
        case "ic_library_books":
            return ic_library_books;
        case "ic_security":
            return ic_security;
        case "arrow_right":
            return arrow_right;
        case "ic_timelapse":
            return ic_timelapse;
        case "ic_check_circle":
            return ic_check_circle;
        case "ic_radio_button_unchecked":
            return ic_radio_button_unchecked;
        case "ic_refresh":
            return ic_refresh;
        case "ic_contacts":
            return ic_contacts;
        case "ic_trending_up":
            return ic_trending_up;
        case "ic_settings":
            return ic_settings;
        case "ic_zoom_out_map":
            return ic_zoom_out_map;
        case "ic_storage":
            return ic_storage;
        case "ic_device_hub":
            return ic_device_hub;
        case "ic_people":
            return ic_people;
        case "ic_view_module":
            return ic_view_module;
        case "ic_desktop_mac":
            return ic_desktop_mac;
        default:
            return {};
    }
};

