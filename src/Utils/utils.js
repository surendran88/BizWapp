
import React from 'react';
import { Linking, NativeModules, PermissionsAndroid, Platform, AsyncStorage } from 'react-native';
import Constant from '../redux/constants';
//import Global from './Global'
//import API from './API';

postOpt = (url = null, params = {}, files = []) => {
	let opts = {
		url: Constant.BASEURL + url,
		method: 'POST',
		params: params
	};
	opts.headers = {
		'Content-Type': 'application/json'
	};
	return opts;
},

	postHeader = () => {
		let accessToken = ''
		let opts = accessToken !== '' ? {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': "Bearer:" + accessToken
				//'Authorization':"Bearer:"+"eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIn0.DFiIiuxX2YAQfwIG8woEWzNQwFcPFYJetk2j1UGZvb38eriQyfeNj4fzJDj6ehUtaIq6m3NC8e9wbj6uEu2HG8BQGL42Z-IE.bNWqjAcI6EoKkhr06NcVLg.AaYhCtSBNH2g5N487DXBWfeMOZtMb2n1hkA-0aZ0wCK9uViBtk7q-JVp9jjJjE3eoVXaKXZJ8eNCOajJgAJBBO8vp9XHthhjyG3MFCvLRarsgDsn6Yt5QCO7bdXjzq6U3IN1ILUCFJSNYLxOTWY9bEDm7R0bbazMCTXYHUZ-FuTqf59egyz2DOx36NTBKjqjT5KI9wexDz8ZN9L5gIIHsilEktJdog2_8MouU598pVLFhVKwtYsGp453jKDKM4Jx4o_xUs8ad7QOtUxk70bG5iqKgIRheZaLxuRXs5ugP5ed0kV0oFdr8rUqs0iQwXawELBWUKdTUyd5RT4rZEQaAGGgDwh4oG6tquy_6gFXaml0HJAs57kYeBocSiikzH2jA2FIHlzfkIy9uNnxg3X-izQgVyLtuX50EDT_moZZbZWKYWKXsysoz5lasBBbdYV4Jh11V437yimItViNqMII5fqUXPuadvjNpsEedRkESas9nGlgbtTIxkMBGj3lsZ6j3Flokf_ja-ZgVEri2SbomiPXfDA1YUAx66SKPCu-l4a8WLzx6NB-4_7gLX-S--dpOgfApps7HxJ5t28APoKNWLAK04mmzvWuq0WsijxzYhlyUPBjQL1q9oURT97pPRsCvkp1uFCOvn7uenFfy2Ls-CwrFKDVzOAwX6njU0pGK8GdBHrNI0UJh-2-a6cT35On0gVrletiXRTisDAjiOxaZ4LMMcDHYex6PfJSyVSghx376bHNmvZuCIJQtUWk9rHzKL5_RDdoD93fRIIzS5srkm77rYIsp3SFMUiH5UNFRQ_dxziFb72LE3gzCYRsM9N2Smyqm_J3RHU911CxEk11b5yOcdCMuHqJXjo42k920fM.Uwfl61ylKH4jfLbIk62bqLj8GEwmqHdWYOvclbLuNgY"

			}
		} :
			{
				headers: {
					'Content-Type': 'application/json',


				}
			};
		//console.log(opts)
		return opts;
	},
	postRefreshHeader = () => {
		let accessToken = ''
		let opts = accessToken !== '' ? {
			headers: {
				'Content-Type': 'application/json',

				'Authorization': "Bearer " + accessToken,
				'Cache-Control': 'no-cache'
				//  'Authorization':"Bearer:"+"eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiSldUIn0.DFiIiuxX2YAQfwIG8woEWzNQwFcPFYJetk2j1UGZvb38eriQyfeNj4fzJDj6ehUtaIq6m3NC8e9wbj6uEu2HG8BQGL42Z-IE.bNWqjAcI6EoKkhr06NcVLg.AaYhCtSBNH2g5N487DXBWfeMOZtMb2n1hkA-0aZ0wCK9uViBtk7q-JVp9jjJjE3eoVXaKXZJ8eNCOajJgAJBBO8vp9XHthhjyG3MFCvLRarsgDsn6Yt5QCO7bdXjzq6U3IN1ILUCFJSNYLxOTWY9bEDm7R0bbazMCTXYHUZ-FuTqf59egyz2DOx36NTBKjqjT5KI9wexDz8ZN9L5gIIHsilEktJdog2_8MouU598pVLFhVKwtYsGp453jKDKM4Jx4o_xUs8ad7QOtUxk70bG5iqKgIRheZaLxuRXs5ugP5ed0kV0oFdr8rUqs0iQwXawELBWUKdTUyd5RT4rZEQaAGGgDwh4oG6tquy_6gFXaml0HJAs57kYeBocSiikzH2jA2FIHlzfkIy9uNnxg3X-izQgVyLtuX50EDT_moZZbZWKYWKXsysoz5lasBBbdYV4Jh11V437yimItViNqMII5fqUXPuadvjNpsEedRkESas9nGlgbtTIxkMBGj3lsZ6j3Flokf_ja-ZgVEri2SbomiPXfDA1YUAx66SKPCu-l4a8WLzx6NB-4_7gLX-S--dpOgfApps7HxJ5t28APoKNWLAK04mmzvWuq0WsijxzYhlyUPBjQL1q9oURT97pPRsCvkp1uFCOvn7uenFfy2Ls-CwrFKDVzOAwX6njU0pGK8GdBHrNI0UJh-2-a6cT35On0gVrletiXRTisDAjiOxaZ4LMMcDHYex6PfJSyVSghx376bHNmvZuCIJQtUWk9rHzKL5_RDdoD93fRIIzS5srkm77rYIsp3SFMUiH5UNFRQ_dxziFb72LE3gzCYRsM9N2Smyqm_J3RHU911CxEk11b5yOcdCMuHqJXjo42k920fM.Uwfl61ylKH4jfLbIk62bqLj8GEwmqHdWYOvclbLuNgY"

			}
		} :
			{
				headers: {
					'Content-Type': 'application/json',


				}
			};
		//console.log(opts)
		return opts;
	},
module.exports = {
	postOpt: postOpt,
	postHeader: postHeader,
	postRefreshHeader: postRefreshHeader,
};
