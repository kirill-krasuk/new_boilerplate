import { takeEvery }     from 'redux-saga/effects';
import { SagaIterator }  from 'redux-saga';

import * as actions      from '@core/actions/modal';
import { callModal }     from './callModal';
import { closeModal }    from './closeModal';

export default function* (): SagaIterator {
    yield takeEvery(actions.CALL_MODAL, callModal);
    yield takeEvery(actions.CLOSE_MODAL, closeModal);
}