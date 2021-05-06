//locationID: description, 1 = Easting: E, 2 = Northing: N, 3 = Latitude, 4 = Longitude.
const location_dict = {
    "H1": ["JTI at Gloucester Road eastbound near the Revenue Tower", 835776.133, 815604.834, 22.279311622, 114.172101664],
    "H2": ["JTI at Canal Road Flyover northbound near exit of Aberdeen Tunnel", 836609.240, 814749.535, 22.271587756, 114.180185283],
    "H3": ["JTI at Island Eastern Corridor westbound near City Garden", 838019.353, 817012.047, 22.292018819, 114.193869616],
    "H11": ["JTI at Island Eastern Corridor westbound near Lei King Wan", 840851.058, 816261.521, 22.285235888, 114.221346549],
    "K01": ["JTI at Ferry Street southbound near Charming Garden", 835228.606, 819561.765, 22.315044916, 114.166786346],
    "K02": ["JTI at Gascoigne Road eastbound near the Hong Kong Polytechnic University", 836432.903, 818548.685, 22.305896494, 114.178474746],
    "K03": ["JTI at Waterloo Road southbound near Kowloon Hospital", 836422.941, 820573.545, 22.324182195, 114.178378266],
    "K04": ["JTI at Princess Margaret Road southbound near Oi Man Estate", 836273.929, 819369.685, 22.313310630, 114.176931903],
    "K05": ["JTI at Kai Fuk Road northbound near the petrol stations", 839344.209, 820099.964, 22.319902728, 114.206732056],
    "K06": ["JTI at Chatham Road North southbound near Fat Kwong Street Playground", 837010.873, 818912.021, 22.309177485, 114.184084134],
    "SJ1": ["JTI at Tai Po Road  Sha Tin near the Racecourse", 839405.76, 829500.77, 22.404797024, 114.207347960],
    "SJ2": ["JTI at Tate’s Cairn Highway near Shek Mun", 839740.36, 827835.46, 22.389757785, 114.210593926],
    "SJ3": ["JTI at Tolo Highway near Science Park", 839366.62, 831956.75, 22.426975789, 114.206972621],
    "SJ4": ["JTI at San Tin Highway near Pok Wai Road", 823591.61, 836073.4, 22.464106829, 114.053710459],
    "SJ5": ["JTI at Tuen Mun Road near Tuen Mun Heung Sze Wui Road", 815710.37, 829102.02, 22.401075772, 113.977226590]
};

const destination_dict = {
    "CH": "Cross Harbour Tunnel",
    "EH": "Eastern Harbour Crossing",
    "WH": "Western Harbour Crossing",
    "LRT": "Lion Rock Tunnel",
    "SMT": "Shing Mun Tunnel",
    "TCT": "Tate's Cairn Tunnel",
    "TKTL": "Ting Kau, via Tai Lam Tunnel",
    "TKTM": "Ting Kau, via Tuen Mun Road",
    "TSCA": "Tsing Sha Control Area",
    "TWCP": "Tsuen Wan via Castle Peak",
    "TWTM": "Tsuen Wan via Tuen Mun"
}

//for journey_data and journey_desc
//it stated that type 2 will have bitmap, need see see dim
const journal_type2_dict = {
    "1": "traffic congested",
    "2": "tunnel congested",
    "3": "tunnel closed",
    "4": "blank"
}

const color_dict = {
    "1": "Red",
    "2": "Yellow",
    "3": "Green",
    "-1": "Not applicable"
}

const loc_to_dest_dict = {
    "H1": ["CH", "EH"],
    "H2": ["CH", "EH", "WH"],
    "H3": ["CH", "WH"],
    "H11": ["CH", "EH"],
    "K01": ["CH", "WH"],
    "K02": ["CH", "EH"],
    "K03": ["CH", "EH", "WH"],
    "K04": ["CH", "WH"],
    "K05": ["CH", "EH"],
    "K06": ["CH", "WH"],
    "SJ1": ["LRT", "SMT", "TSCA"],
    "SJ2": ["LRT", "TCT", "TSCA"],
    "SJ3": ["LRT", "TCT", "TSCA"],
    "SJ4": ["TKTL", "TKTM"],
    "SJ5": ["TWCP", "TWTM"]
}

// Last Changed 15:50 6/5/2021
export { location_dict, destination_dict, journal_type2_dict, color_dict, loc_to_dest_dict };