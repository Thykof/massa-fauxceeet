import { Tag } from '@massalabs/react-ui-kit';

import { tagTypes } from '../../const';
import Intl from '../../i18n/i18n';

export function Disconnected() {
  return (
    <Tag type={tagTypes.error}>
      {Intl.t('connect-wallet.tag.not-connected')}
    </Tag>
  );
}
