const ava = require("ava")
const Feature = require("../no-stacks").Feature

const village_boxes = [];
const district_boxes = [];
const record_points = [];



const feature_in_box = function(feature, box_feature){
    return feature.lat>box_feature.box[0].lat
            &&
            feature.lat<box_feature.box[1].lat
            &&
            feature.lng>box_feature.box[0].lng
            &&
            feature.lng<box_feature.box[2].lng
}

record_points.push(new Feature({id:1,lat:1,lng:2}));
record_points.push(new Feature({id:2,lat:11,lng:12}));
record_points.push(new Feature({id:3,lat:23,lng:24}));
record_points.push(new Feature({id:4,lat:101,lng:102}));
record_points.push(new Feature({id:5,lat:111,lng:112}));
record_points.push(new Feature({id:6,lat:121,lng:122}));




district_boxes.push(new Feature({
    id:1,
    box:[
        {
            lat:0,
            lng:0
        },
        {
            lat:100,
            lng:0
        },
        {
            lat:100,
            lng:100
        },
        {
            lat:0,
            lng:100
        }
    ]
}))

district_boxes.push(new Feature({
    id:2,
    box:[
        {
            lat:100,
            lng:100
        },
        {
            lat:200,
            lng:100
        },
        {
            lat:200,
            lng:200
        },
        {
            lat:100,
            lng:200
        }
    ]
}))

village_boxes.push(
{
    id:1,
    box:[
        {
            lat:0,
            lng:0
        },
        {
            lat:10,
            lng:0
        },
        {
            lat:10,
            lng:10
        },
        {
            lat:0,
            lng:10
        }
    ]
}
)

village_boxes.push(
    {
        id:2,
        box:[
            {
                lat:10,
                lng:10
            },
            {
                lat:20,
                lng:10
            },
            {
                lat:20,
                lng:20
            },
            {
                lat:10,
                lng:20
            }
        ]
    }
    )

    village_boxes.push(
        {
            id:3,
            box:[
                {
                    lat:20,
                    lng:20
                },
                {
                    lat:30,
                    lng:20
                },
                {
                    lat:30,
                    lng:30
                },
                {
                    lat:20,
                    lng:30
                }
            ]
        }
        )


        village_boxes.push(
            {
                id:4,
                box:[
                    {
                        lat:100,
                        lng:100
                    },
                    {
                        lat:110,
                        lng:100
                    },
                    {
                        lat:110,
                        lng:110
                    },
                    {
                        lat:100,
                        lng:110
                    }
                ]
            }
            )
            
        
            village_boxes.push(
                {
                    id:5,
                    box:[
                        {
                            lat:110,
                            lng:110
                        },
                        {
                            lat:120,
                            lng:110
                        },
                        {
                            lat:120,
                            lng:120
                        },
                        {
                            lat:110,
                            lng:120
                        }
                    ]
                }
                )


        village_boxes.push(
            {
                id:6,
                box:[
                    {
                        lat:130,
                        lng:130
                    },
                    {
                        lat:140,
                        lng:130
                    },
                    {
                        lat:140,
                        lng:140
                    },
                    {
                        lat:130,
                        lng:140
                    }
                ]
            }
            )
            
                
    
ava.test('decorated',t =>{
    let f = new Feature({id:2,lat:1.123,lng:2.123})
    
    f.decorate_feature('village_id',feature_in_box,village_boxes)
    t.true(f.hasOwnProperty('village_id'))
})

ava.test('decoreted with expected id', t => {
    let f = new Feature({id:2,lat:1.123,lng:2.123})
    
    f.decorate_feature('village_id',feature_in_box,village_boxes)
    let expected_id = 1
    let actual_id = f['village_id']
    t.deepEqual(expected_id,actual_id)
})


ava.test('decoreted with expected district id', t => {
    let f = new Feature({id:2,lat:1.123,lng:2.123})
    
    f.decorate_feature('district_id',feature_in_box,district_boxes)
    let expected_id = 1
    let actual_id = f['district_id']
    t.deepEqual(expected_id,actual_id)
})

ava.test('filter by district', t => {

    let decoration = 'district_id'
    let filter_id = 1;
    record_points.forEach(p => p.decorate_feature(decoration,feature_in_box,district_boxes))
  
    //Filter 
    let filtered_record_points = record_points.filter(point => point[decoration]==filter_id)
    let expected_district_ids = [1,1,1]
    let actual_district_ids = filtered_record_points.map(point => point[decoration])

    t.deepEqual(expected_district_ids,actual_district_ids)
})

ava.test('filter by village', t => {
    let decoration = 'village_id'
    let filter_id = 1;
    //Decorate Stage
    record_points.forEach(p => p.decorate_feature(decoration,feature_in_box,village_boxes))
  
    //Filter 
    let filtered_record_points = record_points.filter(point => point[decoration]==filter_id)
    let expected_district_ids = [1]
    let actual_district_ids = filtered_record_points.map(point => point[decoration])

    t.deepEqual(expected_district_ids,actual_district_ids)
})





