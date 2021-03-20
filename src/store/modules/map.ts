import { Module, Mutation, VuexModule } from 'vuex-module-decorators';

export interface Loc {
  lat: number;
  lng: number;
}

interface Options {
  center: Loc;
  useCircle: boolean;
}

interface OwnLocation {
  draggable: boolean;
  editable: boolean;
}

@Module({ name: 'map' })
export default class Map extends VuexModule {
  viewCenter: Loc = { lat: 45.508, lng: -73.587 };
  circleCenter: Loc = { lat: 45.508, lng: -73.587 };

  circleRadius = 1024;

  userOwnLocation: OwnLocation = { draggable: false, editable: false };

  currentPlace: google.maps.Place | null = null;

  searchedLocation = false;

  @Mutation
  GEOLOCATE(setCircle: boolean) {
    navigator.geolocation.getCurrentPosition(pos => {
       if (!setCircle) {
        this.viewCenter = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
       } else {
        this.circleCenter = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        }
       }
    });
  }

  @Mutation
  SET_CENTER(options: Options) {
    if (!options.useCircle) {
      this.viewCenter = options.center;
    } else {
      this.circleCenter = options.center;
    }

    this.searchedLocation = true;
  }

  @Mutation
  SET_RADIUS(radius: number) {
    this.circleRadius = radius;
  }

  @Mutation
  SET_OWN_LOCATION(ownLocation: OwnLocation) {
    this.userOwnLocation = ownLocation;
  }

  @Mutation
  SET_SEARCHED_LOCATION(condition: boolean) {
    this.searchedLocation = condition;
  }

  @Mutation
  SET_CURRENT_PLACE(place: google.maps.Place) {
    this.currentPlace = place;
    
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    this.viewCenter.lat = (place as any).geometry.location.lat();
    this.viewCenter.lng = (place as any).geometry.location.lng();
  }
}