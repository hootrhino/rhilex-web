import { getIntl, getLocale } from '@umijs/max';
import { InendType } from '../../Inend/enum';

const intl = getIntl(getLocale());

const inend_coap_ds = `{
  "from": "ID00000",    // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.from' })}
  "data": {}            // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.data' })}
}`;

export const inend_ds = {
  [InendType.COAP]: inend_coap_ds,
  [InendType.HTTP]: inend_coap_ds,
  [InendType.RULEX_UDP]: inend_coap_ds,
  [InendType.GRPC]: inend_coap_ds,
  [InendType.NATS_SERVER]: inend_coap_ds,
};

// 内部事件源
const event_connected_ds = `{
  "type": "DEVICE",                       // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.type',
  })}
  "event": "event.device.connected",      // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.event',
  })}
  "ts": 100000000,                        // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.ts' })}
  "device_info": {
      "uuid": "UUID1234567",              // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.deviceUuid',
      })}
      "name": "test-device"               // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.deviceName',
      })}
  }
}`;
const event_disconnected_ds = `{
  "type": "DEVICE",                       // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.type',
  })}
  "event": "event.device.disconnected",   // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.event',
  })}
  "ts": 100000000,                        // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.ts' })}
  "device_info": {
      "uuid": "UUID1234567",              // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.deviceUuid',
      })}
      "name":"test-device"                // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.deviceName',
      })}
  }
}`;
const event_up_ds = `{
  "type": "SOURCE",                       // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.type',
  })}
  "event": "event.source.up",             // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.event',
  })}
  "ts": 100000000,                        // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.ts' })}
  "source_info": {
      "uuid": "UUID1234567",              // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.sourceUuid',
      })}
      "name": "test-source"               // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.sourceName',
      })}
  }
}`;
const event_down_ds = `{
  "type": "SOURCE",                       // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.type',
  })}
  "event": "event.source.down",           // ${intl.formatMessage({
    id: 'ruleConfig.ds.inend.event',
  })}
  "ts": 100000000,                        // ${intl.formatMessage({ id: 'ruleConfig.ds.inend.ts' })}
  "source_info": {
      "uuid": "UUID1234567",              // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.sourceUuid',
      })}
      "name": "test-source"               // ${intl.formatMessage({
        id: 'ruleConfig.ds.inend.sourceName',
      })}
  }
}`;

export const inend_event_ds = [
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.connected' }),
    json: event_connected_ds,
    key: 'device_connected',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.disconnected' }),
    json: event_disconnected_ds,
    key: 'device_disconnected',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.up' }),
    json: event_up_ds,
    key: 'source_up',
  },
  {
    title: intl.formatMessage({ id: 'ruleConfig.inend.event.down' }),
    json: event_down_ds,
    key: 'source_down',
  },
];

export const links = [
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.ali' }),
    link: 'https://help.aliyun.com/zh/iot/user-guide/what-is-a-tsl-model',
    key: 'aliyun',
  },
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.tencent' }),
    link: 'https://cloud.tencent.com/document/product/1081/34916',
    key: 'tencent',
  },
  {
    label: intl.formatMessage({ id: 'ruleConfig.inend.link.w3c' }),
    link: 'https://www.w3.org/TR/wot-architecture/#abstract',
    key: 'w3c',
  },
];
