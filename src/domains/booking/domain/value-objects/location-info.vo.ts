// ============================================
// BOOKING DOMAIN - LocationInfo Value Object
// ============================================

import type { IValueObject } from '@/shared/types/common.types';
import { LocationType } from '@/shared/types/enums';
import { ValidationError } from '@/shared/errors/base.error';

export interface LocationInfoProps {
  type: LocationType;
  addressId?: string;
  customAddress?: string;
  lat?: number;
  lng?: number;
}

export class LocationInfo implements IValueObject<LocationInfo> {
  private constructor(private props: LocationInfoProps) {
    this.validate();
  }

  static create(props: LocationInfoProps): LocationInfo {
    return new LocationInfo(props);
  }

  static createSalonLocation(): LocationInfo {
    return new LocationInfo({ type: LocationType.SALON });
  }

  static createHomeLocation(
    address: string,
    lat?: number,
    lng?: number
  ): LocationInfo {
    return new LocationInfo({
      type: LocationType.HOME,
      customAddress: address,
      lat,
      lng,
    });
  }

  private validate(): void {
    if (this.props.type === LocationType.HOME) {
      if (!this.props.customAddress && !this.props.addressId) {
        throw new ValidationError('Home location requires an address');
      }
    }

    if (this.props.lat !== undefined && this.props.lng !== undefined) {
      if (this.props.lat < -90 || this.props.lat > 90) {
        throw new ValidationError('Latitude must be between -90 and 90');
      }
      if (this.props.lng < -180 || this.props.lng > 180) {
        throw new ValidationError('Longitude must be between -180 and 180');
      }
    }
  }

  get type(): LocationType {
    return this.props.type;
  }

  get address(): string | undefined {
    return this.props.customAddress;
  }

  get coordinates(): { lat: number; lng: number } | undefined {
    if (this.props.lat !== undefined && this.props.lng !== undefined) {
      return { lat: this.props.lat, lng: this.props.lng };
    }
    return undefined;
  }

  isSalon(): boolean {
    return this.props.type === LocationType.SALON;
  }

  isHome(): boolean {
    return this.props.type === LocationType.HOME;
  }

  equals(other: LocationInfo): boolean {
    return (
      this.props.type === other.props.type &&
      this.props.addressId === other.props.addressId &&
      this.props.customAddress === other.props.customAddress &&
      this.props.lat === other.props.lat &&
      this.props.lng === other.props.lng
    );
  }

  getValue(): LocationInfoProps {
    return { ...this.props };
  }
}
